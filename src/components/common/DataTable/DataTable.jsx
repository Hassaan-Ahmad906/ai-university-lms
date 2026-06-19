import React, { useState, useMemo } from 'react';
import {
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Inbox,
} from 'lucide-react';
import './DataTable.css';

const DataTable = ({
  columns = [],
  data = [],
  searchable = true,
  searchPlaceholder = 'Search...',
  selectable = false,
  zebra = false,
  loading = false,
  loadingRows = 5,
  pageSize = 10,
  emptyTitle = 'No data found',
  emptyText = 'Try adjusting your search or filters.',
  toolbarActions,
  onRowClick,
  className = '',
  ...props
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data by search
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    const query = searchQuery.toLowerCase();
    return data.filter((row) =>
      columns.some((col) => {
        const val = row[col.key];
        return val !== undefined && val !== null && String(val).toLowerCase().includes(query);
      })
    );
  }, [data, searchQuery, columns]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Paginate
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSort = (key, sortable) => {
    if (!sortable) return;
    setSortConfig((prev) => {
      if (prev.key === key) {
        if (prev.direction === 'asc') return { key, direction: 'desc' };
        if (prev.direction === 'desc') return { key: null, direction: null };
      }
      return { key, direction: 'asc' };
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(new Set(paginatedData.map((_, i) => (currentPage - 1) * pageSize + i)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (index) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const allCurrentSelected =
    paginatedData.length > 0 &&
    paginatedData.every((_, i) =>
      selectedRows.has((currentPage - 1) * pageSize + i)
    );

  const tableClasses = [
    'pu-datatable',
    zebra && 'pu-datatable--zebra',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Loading Skeleton
  if (loading) {
    return (
      <div className={tableClasses} {...props}>
        {searchable && (
          <div className="pu-datatable__toolbar">
            <div className="pu-datatable__search">
              <span className="pu-datatable__search-icon"><Search /></span>
              <input className="pu-datatable__search-input" placeholder={searchPlaceholder} disabled />
            </div>
          </div>
        )}
        <div className="pu-datatable__wrapper">
          {Array.from({ length: loadingRows }).map((_, i) => (
            <div key={i} className="pu-datatable__skeleton-row">
              {columns.map((col, ci) => (
                <div
                  key={ci}
                  className="pu-datatable__skeleton-cell"
                  style={{ flex: col.width || 1, minWidth: '60px' }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={tableClasses} {...props}>
      {/* Toolbar */}
      {(searchable || toolbarActions) && (
        <div className="pu-datatable__toolbar">
          {searchable && (
            <div className="pu-datatable__search">
              <span className="pu-datatable__search-icon" aria-hidden="true">
                <Search />
              </span>
              <input
                type="text"
                className="pu-datatable__search-input"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                aria-label="Search table"
              />
            </div>
          )}
          {toolbarActions && (
            <div className="pu-datatable__toolbar-actions">{toolbarActions}</div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="pu-datatable__wrapper">
        {paginatedData.length === 0 ? (
          <div className="pu-datatable__empty">
            <div className="pu-datatable__empty-icon">
              <Inbox />
            </div>
            <div className="pu-datatable__empty-title">{emptyTitle}</div>
            <div className="pu-datatable__empty-text">{emptyText}</div>
          </div>
        ) : (
          <table className="pu-datatable__table">
            <thead>
              <tr>
                {selectable && (
                  <th style={{ width: '44px' }}>
                    <input
                      type="checkbox"
                      className="pu-datatable__checkbox"
                      checked={allCurrentSelected}
                      onChange={handleSelectAll}
                      aria-label="Select all rows"
                    />
                  </th>
                )}
                {columns.map((col) => (
                  <th key={col.key} style={col.width ? { width: col.width } : {}}>
                    <span
                      className="pu-datatable__th-content"
                      onClick={() => handleSort(col.key, col.sortable !== false)}
                      role={col.sortable !== false ? 'button' : undefined}
                      tabIndex={col.sortable !== false ? 0 : undefined}
                      onKeyDown={
                        col.sortable !== false
                          ? (e) => {
                              if (e.key === 'Enter') handleSort(col.key, true);
                            }
                          : undefined
                      }
                    >
                      {col.label}
                      {col.sortable !== false && (
                        <span
                          className={`pu-datatable__sort-icon ${
                            sortConfig.key === col.key
                              ? 'pu-datatable__sort-icon--active'
                              : ''
                          }`}
                        >
                          {sortConfig.key === col.key ? (
                            sortConfig.direction === 'asc' ? (
                              <ArrowUp />
                            ) : (
                              <ArrowDown />
                            )
                          ) : (
                            <ArrowUpDown />
                          )}
                        </span>
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, rowIndex) => {
                const globalIndex = (currentPage - 1) * pageSize + rowIndex;
                const isSelected = selectedRows.has(globalIndex);
                return (
                  <tr
                    key={row.id ?? globalIndex}
                    className={isSelected ? 'pu-datatable__row--selected' : ''}
                    onClick={() => onRowClick?.(row, globalIndex)}
                    style={onRowClick ? { cursor: 'pointer' } : {}}
                  >
                    {selectable && (
                      <td>
                        <input
                          type="checkbox"
                          className="pu-datatable__checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectRow(globalIndex)}
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Select row ${globalIndex + 1}`}
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td key={col.key}>
                        {col.render ? col.render(row[col.key], row, globalIndex) : row[col.key]}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pu-datatable__pagination">
          <span className="pu-datatable__pagination-info">
            Showing {(currentPage - 1) * pageSize + 1}–
            {Math.min(currentPage * pageSize, sortedData.length)} of{' '}
            {sortedData.length}
          </span>
          <div className="pu-datatable__pagination-controls">
            <button
              className="pu-datatable__page-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              aria-label="Previous page"
            >
              <ChevronLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                if (totalPages <= 5) return true;
                if (page === 1 || page === totalPages) return true;
                return Math.abs(page - currentPage) <= 1;
              })
              .map((page, index, arr) => (
                <React.Fragment key={page}>
                  {index > 0 && arr[index - 1] !== page - 1 && (
                    <span style={{ color: 'var(--color-text-tertiary)', padding: '0 4px' }}>…</span>
                  )}
                  <button
                    className={`pu-datatable__page-btn ${
                      currentPage === page ? 'pu-datatable__page-btn--active' : ''
                    }`}
                    onClick={() => setCurrentPage(page)}
                    aria-label={`Page ${page}`}
                    aria-current={currentPage === page ? 'page' : undefined}
                  >
                    {page}
                  </button>
                </React.Fragment>
              ))}
            <button
              className="pu-datatable__page-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              aria-label="Next page"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;

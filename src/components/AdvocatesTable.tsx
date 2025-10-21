'use client';

import { Advocate } from '@/types/advocate';

interface AdvocatesTableProps {
  advocates: Advocate[];
  currentPage: number;
  totalPages: number;
  total: number;
  onPageChange: (page: number) => void;
}

export default function AdvocatesTable({
  advocates,
  currentPage,
  totalPages,
  total,
  onPageChange
}: AdvocatesTableProps) {
  const startRecord = (currentPage - 1) * 10 + 1;
  const endRecord = Math.min(currentPage * 10, total);

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          disabled={i === currentPage}
          className={`px-4 py-2 mx-1 rounded-md text-sm font-medium transition-colors ${
            i === currentPage
              ? 'bg-solace-blue text-white cursor-default'
              : 'bg-white text-solace-blue border border-solace-blue hover:bg-solace-blue-light hover:text-white'
          }`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white border border-solace-gray-200">
          <thead className="bg-solace-blue text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                First Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Last Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                City
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Degree
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Specialties
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Years of Experience
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Phone Number
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-solace-gray-200">
            {advocates.map((advocate, index) => (
              <tr
                key={advocate.id || index}
                className="hover:bg-solace-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 text-sm text-solace-dark whitespace-nowrap">
                  {advocate.firstName}
                </td>
                <td className="px-6 py-4 text-sm text-solace-dark whitespace-nowrap">
                  {advocate.lastName}
                </td>
                <td className="px-6 py-4 text-sm text-solace-gray-700">
                  {advocate.city}
                </td>
                <td className="px-6 py-4 text-sm text-solace-gray-700">
                  {advocate.degree}
                </td>
                <td className="px-6 py-4 text-sm text-solace-gray-700">
                  {advocate.specialties.map((s, i) => (
                    <span
                      key={i}
                      className="inline-block bg-solace-blue-light text-white px-2 py-1 rounded-full text-xs mr-1 mb-1"
                    >
                      {s}
                    </span>
                  ))}
                </td>
                <td className="px-6 py-4 text-sm text-solace-gray-700 text-center">
                  {advocate.yearsOfExperience}
                </td>
                <td className="px-6 py-4 text-sm text-solace-gray-700 whitespace-nowrap">
                  {advocate.phoneNumber}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-solace-gray-700">
          Showing <span className="font-semibold text-solace-dark">{startRecord}</span> to{' '}
          <span className="font-semibold text-solace-dark">{endRecord}</span> of{' '}
          <span className="font-semibold text-solace-dark">{total}</span> advocates
        </div>

        <div className="flex items-center">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 mx-1 rounded-md text-sm font-medium transition-colors ${
              currentPage === 1
                ? 'bg-solace-gray-200 text-solace-gray-400 cursor-not-allowed'
                : 'bg-white text-solace-blue border border-solace-blue hover:bg-solace-blue-light hover:text-white'
            }`}
          >
            Previous
          </button>

          {renderPageNumbers()}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 mx-1 rounded-md text-sm font-medium transition-colors ${
              currentPage === totalPages
                ? 'bg-solace-gray-200 text-solace-gray-400 cursor-not-allowed'
                : 'bg-white text-solace-blue border border-solace-blue hover:bg-solace-blue-light hover:text-white'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

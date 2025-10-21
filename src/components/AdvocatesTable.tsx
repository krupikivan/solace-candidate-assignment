'use client';

import { Advocate } from '@/types/advocate';

interface AdvocatesTableProps {
  advocates: Advocate[];
}

export default function AdvocatesTable({ advocates }: AdvocatesTableProps) {
  return (
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
  );
}

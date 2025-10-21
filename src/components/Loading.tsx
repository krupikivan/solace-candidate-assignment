export default function Loading() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-solace-gray-200 border-t-solace-blue mb-4"></div>
        <p className="text-solace-gray-600 font-medium">Loading advocates...</p>
      </div>
    </div>
  );
}

function SearchBar({ filters, setFilters }) {
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="bg-white shadow-xl rounded-2xl p-6">

        <h2 className="text-2xl font-bold mb-6 text-center">
          🔍 Search Study Material
        </h2>

        <div className="grid md:grid-cols-4 gap-4">

          {/* Search */}
          <input
            type="text"
            name="search"
            placeholder="Search title or subject..."
            value={filters.search}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          {/* Branch */}
          <select
            name="branch"
            value={filters.branch}
            onChange={handleChange}
            className="border rounded-lg p-3"
          >
            <option value="">All Branches</option>
            <option value="CSE">CSE</option>
            <option value="AI & ML">AI & ML</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Civil">Civil</option>
            <option value="BCA">BCA</option>
          </select>

          {/* Semester */}
          <select
            name="semester"
            value={filters.semester}
            onChange={handleChange}
            className="border rounded-lg p-3"
          >
            <option value="">All Semesters</option>
            {[1,2,3,4,5,6,7,8].map((sem) => (
              <option key={sem} value={sem}>
                Semester {sem}
              </option>
            ))}
          </select>

          {/* Reset */}
          <button
            onClick={() =>
              setFilters({
                search: "",
                branch: "",
                semester: "",
              })
            }
            className="bg-blue-700 hover:bg-blue-800 text-white rounded-lg p-3"
          >
            Reset Filters
          </button>

        </div>
      </div>
    </section>
  );
}

export default SearchBar;
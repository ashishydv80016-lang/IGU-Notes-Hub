function Stats() {
  return (
    <section className="py-16 bg-gray-100">

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6">

        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <h2 className="text-4xl font-bold text-blue-700">500+</h2>
          <p className="mt-2">Notes</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <h2 className="text-4xl font-bold text-green-700">200+</h2>
          <p className="mt-2">Previous Papers</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <h2 className="text-4xl font-bold text-orange-600">50+</h2>
          <p className="mt-2">Subjects</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <h2 className="text-4xl font-bold text-purple-700">1000+</h2>
          <p className="mt-2">Students</p>
        </div>

      </div>

    </section>
  );
}

export default Stats;
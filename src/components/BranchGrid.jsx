import {
  FaLaptopCode,
  FaBolt,
  FaCogs,
  FaBuilding,
  FaMicrochip,
  FaGraduationCap,
} from "react-icons/fa";

const branches = [
  {
    name: "Computer Science",
    short: "CSE",
    icon: <FaLaptopCode size={40} />,
    color: "bg-blue-600",
  },
  {
    name: "Electronics",
    short: "ECE",
    icon: <FaMicrochip size={40} />,
    color: "bg-green-600",
  },
  {
    name: "Electrical",
    short: "EEE",
    icon: <FaBolt size={40} />,
    color: "bg-yellow-500",
  },
  {
    name: "Mechanical",
    short: "ME",
    icon: <FaCogs size={40} />,
    color: "bg-red-600",
  },
  {
    name: "Civil",
    short: "CE",
    icon: <FaBuilding size={40} />,
    color: "bg-purple-600",
  },
  {
    name: "BCA",
    short: "BCA",
    icon: <FaGraduationCap size={40} />,
    color: "bg-indigo-600",
  },
];

function BranchGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      <h2 className="text-4xl font-bold text-center mb-12">
        🎓 Browse by Branch
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

        {branches.map((branch) => (
          <div
            key={branch.short}
            className={`${branch.color} text-white rounded-2xl p-6 text-center shadow-lg hover:scale-105 hover:shadow-2xl transition duration-300 cursor-pointer`}
          >
            <div className="flex justify-center mb-4">
              {branch.icon}
            </div>

            <h3 className="text-xl font-bold">
              {branch.short}
            </h3>

            <p className="mt-2 text-sm">
              {branch.name}
            </p>
          </div>
        ))}

      </div>

    </section>
  );
}

export default BranchGrid;
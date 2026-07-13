function Features() {
  const features = [
    {
      icon: "📚",
      title: "Study Notes",
      desc: "Semester-wise notes for every branch.",
    },
    {
      icon: "📝",
      title: "Previous Papers",
      desc: "Practice with previous year question papers.",
    },
    {
      icon: "📥",
      title: "Fast Downloads",
      desc: "Download PDFs instantly from Cloudinary.",
    },
    {
      icon: "👨‍🎓",
      title: "Student Community",
      desc: "Made by students for students.",
    },
    {
      icon: "🔒",
      title: "Secure Login",
      desc: "JWT authentication with protected routes.",
    },
    {
      icon: "⚡",
      title: "24×7 Access",
      desc: "Access your study material anytime.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose IGU Notes Hub?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:scale-105 transition"
            >
              <div className="text-5xl mb-4">
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;
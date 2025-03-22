import React from "react";

export function HRModule() {
  const businessTasks = [
    { id: 1, name: "Manage Employee Records", description: "Add, update, or delete employee details." },
    { id: 2, name: "Payroll Management", description: "Process salaries and manage payroll data." },
    { id: 3, name: "Attendance Tracking", description: "Monitor employee attendance and leave records." },
    { id: 4, name: "Recruitment", description: "Post job openings and manage applications." },
    { id: 5, name: "Performance Reviews", description: "Evaluate employee performance and provide feedback." },
  ];

  return (
    <section className="hr-module p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">HR Module</h2>
      <p className="mb-4">Manage all HR-related tasks efficiently.</p>
      <ul className="space-y-4">
        {businessTasks.map((task) => (
          <li key={task.id} className="border-b pb-4">
            <h3 className="text-lg font-semibold">{task.name}</h3>
            <p className="text-gray-600">{task.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TaskCompletionChart = ({ tasks }) => {
  const completedTasks = tasks.filter(task => task.status === 'Done').length;
  const pendingTasks = tasks.length - completedTasks;
  const todo = tasks.map(task => task.status === 'To Do')

  const data = [
    { name: 'Done', value: completedTasks },
    { name: 'In Progress', value: pendingTasks },
    { name: 'To Do', value: todo },
  ];

  const COLORS = ['#42A5F5', '#FF7043','#4ADE80']; 

  return (
    <div className='w-5/6'> 
      <h3 className='text-center'>Task Completion</h3>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
            {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index]} />)}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TaskCompletionChart;

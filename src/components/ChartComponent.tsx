import React, { useState, useEffect } from 'react';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

import './ChartComponent.css'; 

interface DataItem {
    timestamp: string;
    value: number;
}

const ChartComponent: React.FC = () => {
    const [data, setData] = useState<DataItem[]>([]); // State to hold the original data
    const [filteredData, setFilteredData] = useState<DataItem[]>([]); // State to hold filtered data

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data.json'); // Update the path to match the location of your JSON file
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Function to filter data based on timeframe (monthly, weekly, daily)
    const filterData = (timeframe: string) => {
        let filtered: DataItem[] = [];

        switch (timeframe) {
            case 'monthly':
                // Example: Filter for January 2023
                filtered = data.filter(
                    (item) =>
                        new Date(item.timestamp).getMonth() === 0 &&
                        new Date(item.timestamp).getFullYear() === 2023
                );
                break;
            case 'weekly':
                // Example: Filter for the first week of January 2023
                const firstDayOfMonth = new Date(2023, 0, 1); // January 1, 2023
                const lastDayOfMonth = new Date(2023, 0, 7); // January 7, 2023
                filtered = data.filter(
                    (item) =>
                        new Date(item.timestamp) >= firstDayOfMonth &&
                        new Date(item.timestamp) <= lastDayOfMonth
                );
                break;
            case 'daily':
                // Example: Filter for January 1, 2023
                filtered = data.filter(
                    (item) =>
                        new Date(item.timestamp)
                            .toISOString()
                            .split('T')[0] === '2023-01-01'
                );
                break;
            default:
                filtered = data; // Default to returning all data if timeframe is not recognized
                break;
        }

        setFilteredData(filtered);
    };

    return (
        <div>
            <div className='btn-name'>
            <button className='btn-each' onClick={() => filterData('monthly')}>Filter Monthly</button>
            <button className='btn-each' onClick={() => filterData('weekly')}>Filter Weekly</button>
            <button className='btn-each' onClick={() => filterData('daily')}>Filter Daily</button>
            </div>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    data={filteredData.length > 0 ? filteredData : data} // Render filteredData if available, else render original data
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ChartComponent;

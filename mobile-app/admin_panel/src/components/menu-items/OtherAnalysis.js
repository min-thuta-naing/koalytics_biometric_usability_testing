import React from 'react';
import styled from 'styled-components';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

// Sample Data
const deviceData = [
  { name: 'iOS', value: 60 },
  { name: 'Android', value: 40 },
];

const osDataIOS = [
  { name: 'iOS 15', users: 400 },
  { name: 'iOS 16', users: 300 },
];

const osDataAndroid = [
  { name: 'Android 11', users: 500 },
  { name: 'Android 12', users: 350 },
];

const regionData = [
  { country: 'USA', users: 500, coordinates: [-98.35, 39.50] },
  { country: 'UK', users: 300, coordinates: [-3.43, 55.38] },
  { country: 'India', users: 700, coordinates: [78.96, 20.59] },
  { country: 'Germany', users: 250, coordinates: [10.45, 51.17] },
];

const COLORS = ['#FF6B6B', '#4D96FF'];

// Styled components
const Container = styled.div`
  padding: 30px;
  font-family: 'Arial', sans-serif;
  background-color: #f4f6f9;
`;

const Section = styled.div`
  margin-bottom: 50px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); 
  padding: 20px;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  color: #333;
  margin-bottom: 10px;
`;

const SectionDescription = styled.p`
  text-align: center;
  font-size: 1rem;
  color: #555;
  margin-bottom: 30px;
`;

const ChartTitle = styled.h3`
  text-align: center;
  font-size: 1.5rem;
  color: #444;
  margin-bottom: 20px;
`;

const ChartRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 equal columns in one row */
  gap: 20px;
  margin-bottom: 30px;
`;

const ChartItem = styled.div`
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MapContainer = styled.div`
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: 400px;
`;

const OtherAnalysis = () => {
  return (
    <Container>
      {/* Device & Platform Analysis Section */}
      <Section>
        <SectionTitle>Device & Platform Analysis</SectionTitle>
        <SectionDescription>
          The analysis regarding how users access the Koalytics mobile app is displayed below.
        </SectionDescription>

        {/* Device Types, iOS and Android Version Distribution in the same row */}
        <ChartRow>
          {/* Device Types Distribution */}
          <ChartItem>
            <ChartTitle>Device Type Distribution</ChartTitle>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={deviceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} innerRadius={30} label>
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={20} />
              </PieChart>
            </ResponsiveContainer>
          </ChartItem>

          {/* iOS Version Distribution */}
          <ChartItem>
            <ChartTitle>iOS Version Distribution</ChartTitle>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={osDataIOS}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#FF6B6B" />
              </BarChart>
            </ResponsiveContainer>
          </ChartItem>

          {/* Android Version Distribution */}
          <ChartItem>
            <ChartTitle>Android Version Distribution</ChartTitle>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={osDataAndroid}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#4D96FF" />
              </BarChart>
            </ResponsiveContainer>
          </ChartItem>
        </ChartRow>
      </Section>

      {/* Geographical Analysis Section */}
      <Section>
        <SectionTitle>Geographical Analysis</SectionTitle>
        <SectionDescription>
          The analysis regarding where users access the Koalytics mobile app is displayed below.
        </SectionDescription>

        <ChartRow>
          {/* World Map with User Dots */}
          <MapContainer>
            <ChartTitle>User Distribution by Country</ChartTitle>
            <ComposableMap projectionConfig={{ scale: 140 }}>
              <Geographies geography="/geojson/countries.geo.json">
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: { fill: '#EEE', stroke: '#607D8B', strokeWidth: 0.5 },
                        hover: { fill: '#CFD8DC' },
                        pressed: { fill: '#FF5722' },
                      }}
                    />
                  ))
                }
              </Geographies>
              {regionData.map((region, index) => (
                <Marker key={index} coordinates={region.coordinates}>
                  <circle r={5} fill="#F53" stroke="#FFF" strokeWidth={1} />
                </Marker>
              ))}
            </ComposableMap>
          </MapContainer>

          {/* Country-wise User Distribution Bar Chart */}
          <ChartItem>
            <ChartTitle>Users by Country</ChartTitle>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={regionData.sort((a, b) => b.users - a.users)}>
                <XAxis dataKey="country" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#FFBB28" />
              </BarChart>
            </ResponsiveContainer>
          </ChartItem>
        </ChartRow>
      </Section>
    </Container>
  );
};

export default OtherAnalysis;

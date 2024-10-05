import React, { useEffect, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer'; // Import the PDF download link
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: 'Courier', 
    },
    header: {
      fontSize: 24,
      textAlign: 'center',
      marginBottom: 20,
      fontFamily: 'Times-Roman', 
    },
    section: {
      marginBottom: 15,
    },
    subHeader: {
      fontSize: 16,
      marginBottom: 10,
      fontFamily: 'Courier', 
    },
    row: {
      flexDirection: 'row', 
      marginBottom: 8,
    },
    cell: {
      fontSize: 12,
      flex: 1, 
      paddingRight: 10, 
      fontFamily: 'Courier', 
    },
    headerCell: {
      fontSize: 14,
      fontWeight: 'bold',
      flex: 1,
      paddingBottom: 5,
      fontFamily: 'Courier', 
    },
    footer: {
      position: 'absolute',
      fontSize: 10,
      bottom: 30,
      left: 30,
      right: 30,
      textAlign: 'center',
      color: 'grey',
      fontFamily: 'Courier', 
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 10,
      bottom: 30,
      right: 30,
      textAlign: 'center',
      color: 'grey',
      fontFamily: 'Courier', 
    },
  });
  

const MyDocument = ({ remedies }) => (
  <Document>
    <Page style={styles.page}>
      {/* Report Header */}
      <View style={styles.section}>
        <Text style={styles.header}>Remedies Report</Text>
        <Text style={styles.subHeader}>Date of Publish: {new Date().toLocaleDateString()}</Text>
        <Text>Total Remedies: {remedies.length}</Text>
      </View>

      {/* Header Row (Titles) */}
      <View style={styles.row}>
        <Text style={styles.headerCell}>Remedy Name</Text>
        <Text style={styles.headerCell}>Created Date</Text>
        <Text style={styles.headerCell}>Last Updated</Text>
      </View>

      {/* Remedies Data */}
      {remedies.map((remedy) => (
        <View style={styles.row} key={remedy._id}>
          <Text style={styles.cell}>{remedy.diseaseName}</Text>
          <Text style={styles.cell}>{new Date(remedy.createdAt).toLocaleDateString()}</Text>
          <Text style={styles.cell}>{new Date(remedy.updatedAt).toLocaleDateString()}</Text>
        </View>
      ))}

      {/* Footer with Page Numbers */}
      <Text style={styles.footer}>
        CropShield
      </Text>
      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
    </Page>
  </Document>
);

const RemedyReport = ({ url }) => {
  const [remedies, setRemedies] = useState([]);
  const [sortOption, setSortOption] = useState('alphabetical'); 

  // Function to fetch remedies data
  const fetchRemediesData = async () => {
    const response = await fetch(`${url}/api/remediation/list`); 
    const data = await response.json();
    return data;
  };

  // Sort remedies based on the selected option
  const sortRemedies = (data) => {
    if (sortOption === 'alphabetical') {
      return data.sort((a, b) => a.diseaseName.localeCompare(b.diseaseName));
    } else if (sortOption === 'updated') {
      return data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }
    return data;
  };

  // Fetch remedies data when the component mounts
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchRemediesData();
      const sortedData = sortRemedies(data);
      setRemedies(sortedData);
    };

    loadData();
  }, [sortOption]); 

  // Handle sorting option change
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Remedies Report</h1>
  
      <div style={flexContainerStyle}>
        {/* Sorting Filter */}
        <div style={filterStyle}>
          <label htmlFor="sort" style={labelStyle}>Sort by: </label>
          <select id="sort" onChange={handleSortChange} value={sortOption} style={selectStyle}>
            <option value="alphabetical">Alphabetical Order</option>
            <option value="updated">Last Updated</option>
          </select>
        </div>
  
        <PDFDownloadLink
          document={<MyDocument remedies={remedies} />} // Pass remedies data to PDF
          fileName="remedies_report.pdf"
          style={downloadButtonStyle}
        >
          {({ loading }) => (loading ? 'Loading document...' : 'Download PDF Report')}
        </PDFDownloadLink>
      </div>
  
      <div>
        <h2>Total Remedies: {remedies.length}</h2>
        <table style={tableStyle}>
          <thead>
            <tr style={tableHeaderStyle}>
              <th style={tableCellStyle}>Remedy Name</th>
              <th style={tableCellStyle}>Created Date</th>
              <th style={tableCellStyle}>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {remedies.map((remedy) => (
              <tr key={remedy._id} style={tableRowStyle}>
                <td style={tableCellStyle}>{remedy.diseaseName}</td>
                <td style={tableCellStyle}>{new Date(remedy.createdAt).toLocaleDateString()}</td>
                <td style={tableCellStyle}>{new Date(remedy.updatedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
};

export default RemedyReport;

// CSS styles in JS
const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    margin: '0 auto',
    padding: '20px',
    width: '900px', 
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };
  const flexContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  };

const headerStyle = {
  fontSize: '28px',
  color: '#333',
  marginBottom: '20px',
};

const filterStyle = {
  marginBottom: '20px',
};

const labelStyle = {
  fontSize: '16px',
  marginRight: '10px',
};

const selectStyle = {
  padding: '8px',
  fontSize: '16px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const downloadButtonStyle = {
  display: 'inline-block',
  padding: '10px 20px',
  backgroundColor: '#4CAF50',
  color: '#fff',
  textDecoration: 'none',
  borderRadius: '4px',
  marginBottom: '20px',
  cursor: 'pointer',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
};

const tableHeaderStyle = {
  backgroundColor: '#f2f2f2',
};

const tableCellStyle = {
  border: '1px solid #ddd',
  padding: '12px',
  textAlign: 'left',
};

const tableRowStyle = {
  backgroundColor: '#fff',
  transition: 'background-color 0.2s',
};

tableRowStyle[':hover'] = {
  backgroundColor: '#f1f1f1',
};

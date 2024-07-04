'use client';

import { useState } from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { useRouter }  from 'next/navigation';

interface Table {
    id: number;
    title: string;
}

const initialTables: Table[] = [
    { id: 1, title: 'Table 1' },
    { id: 2, title: 'Table 2' },
];

export default function Home() {
  const [tables] = useState(initialTables);
  const router = useRouter();

  const handleViewTable = (id: number) => {
    router.push(`/table/${id}`);
  };

  return (
    <Box sx={{ width: '80%', margin: '20px auto', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>Tables List</Typography>
      {tables.map((table) => (
        <Card key={table.id} sx={{ margin: '10px 0' }}>
          <CardContent>
            <Typography variant="h6">{table.title}</Typography>
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ marginTop: '10px' }} 
              onClick={() => handleViewTable(table.id)}
            >
              View Table
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
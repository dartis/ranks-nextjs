'use client';

import Image from "next/image";
import { useState, ChangeEvent, KeyboardEvent, useEffect } from 'react';
import { useSearchParams  } from 'next/navigation';
import { TextField, Chip, Box, Typography, Button, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';

interface Items {
  S: string[];
  A: string[];
  B: string[];
  C: string[];
  D: string[];
  F: string[];
}

const initialItems: { [key: string]: Items } = {
  1: { S: ['Item 1', 'Item 2'], A: [], B: [], C: [], D: [], F: [] },
  2: { S: [], A: ['Item 3'], B: [], C: [], D: [], F: [] },
};

export default function TablePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id');
  const [inputValue, setInputValue] = useState('');
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [items, setItems] = useState<Items>(initialItems[id as string] || {
    S: [],
    A: [],
    B: [],
    C: [],
    D: [],
    F: [],
  });

  useEffect(() => {
    if (id) {
      setItems(initialItems[id] || { S: [], A: [], B: [], C: [], D: [], F: [] });
    }
  }, [id]);

  const handleRowClick = (row: string) => {
    setSelectedRow(row);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && selectedRow) {
      setItems((prevItems) => ({
        ...prevItems,
        [selectedRow]: [...prevItems[selectedRow], inputValue],
      }));
      setInputValue('');
    }
  };

  return (
    <Box sx={{ width: '80%', margin: '20px auto', textAlign: 'center' }}>
      <Button 
        variant="contained" 
        color="primary" 
        sx={{ marginBottom: '20px' }} 
        onClick={() => router.push('/')}
      >
        Back to Tables List
      </Button>
      <Paper elevation={3}>
        {Object.keys(items).map((row) => (
            <Box
              key={row}
              onClick={() => handleRowClick(row)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                borderBottom: '1px solid #ccc',
                cursor: 'pointer',
                backgroundColor: selectedRow === row ? '#e0e0e0' : 'transparent',
              }}
            >
              <Typography variant="h6" sx={{ width: '30px' }}>{row}</Typography>
              <Box sx={{ borderLeft: '1px solid #ccc', paddingLeft: '10px', flexGrow: 1 }}>
                {items[row].map((item, index) => (
                  <Chip key={index} label={item} sx={{ margin: '2px' }} />
                ))}
              </Box>
            </Box>
          ))}
          <Box sx={{ padding: '10px' }}>
            <TextField
              label="Enter item..."
              variant="outlined"
              fullWidth
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </Box>
        </Paper>
      </Box>
  );
}

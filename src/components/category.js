import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Spin } from 'antd'; // Importer Spin d'antd

export default function Category() {
  const theme = useTheme();
  const url = "https://www.themealdb.com/api/json/v1/1/categories.php";
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // État de chargement
  const navigate = useNavigate();

  const fetchData = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setData(data.categories);
        } else {
          console.error("No found");
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false); // Arrête le chargement après la récupération
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box className="card-container">
      {loading ? ( // Affiche l'indicateur de chargement si `loading` est vrai
        <Spin tip="Loading..." size="large" />
      ) : (
        data?.map((cat, key) => (
          <Card
            key={key}
            className="card"
            onClick={() => navigate(`/category/${cat.strCategory}`)}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent>
                <Typography component="div" variant="h5">
                  {cat.strCategory}
                </Typography>
              </CardContent>
            </Box>
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image={cat.strCategoryThumb}
              alt={cat.strCategory}
            />
          </Card>
        ))
      )}
    </Box>
  );
}

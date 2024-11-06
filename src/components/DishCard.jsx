import React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function DishCard({ project }) {
    return (
        <div className="group rounded-lg shadow-lg overflow-hidden relative">
            <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover rounded-3xl p-2"
            />
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 transition-transform duration-500 transform translate-y-full group-hover:translate-y-20">
                
                <div className="flex flex-col justify-center -mt-48 items-center h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-lg font-semibold -mt-10">
                      
                    </p>
                    <Stack spacing={1}>
                        <Rating 
                            name="half-rating-read" 
                            defaultValue={project.rating} 
                            precision={0.5} 
                            readOnly 
                            size="large" 
                            sx={{ color: 'yellow' }} 
                        />
                    </Stack>
                </div>
            </div>

            <div className="p-4 relative z-10">
                <h3 className="mb-2 text-2xl font-bold tracking-normal">{project.title}</h3>
                <p className="text-sm tracking-normal">{project.description}</p>
            </div>
        </div>
    );
}

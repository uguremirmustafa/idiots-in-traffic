import { Coordinate } from 'ol/coordinate';
import React, { useState } from 'react';
import { useModal } from 'store';
import { useForm } from 'react-hook-form';

function NewReport() {
  const { control } = useForm({
    defaultValues: {
      name: '',
    },
  });

  return <div>sadsa</div>;
}

export default NewReport;

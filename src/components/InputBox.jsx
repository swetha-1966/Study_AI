import React from 'react';
import { GeneratorForm } from '../features/generator/components/GeneratorForm';

export function InputBox({ onSubmit, loading }) {
  return <GeneratorForm onSubmit={onSubmit} loading={loading} />;
}

import React from 'react'
import { render, screen } from '@testing-library/react'
import List from '../views/List'

test('list', () => {
  render(<List />)
  const linkElement = screen.getByText(/列表/i)
  expect(linkElement).toBeInTheDocument()
})

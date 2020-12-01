import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '../views/Home'

test('home', () => {
  render(<Home />)
  const linkElement = screen.getByText(/首页/i)
  expect(linkElement).toBeInTheDocument()
})

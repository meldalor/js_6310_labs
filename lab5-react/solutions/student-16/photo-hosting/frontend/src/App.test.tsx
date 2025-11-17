import { render, screen } from '@testing-library/react'

import App from './App'

describe('App', () => {
  test('renders header', () => {
    render(<App />)

    expect(screen.getByText('Галерея фотографий')).toBeInTheDocument()
    expect(screen.getByText('Демонстрация компонентов Gallery и PhotoCard')).toBeInTheDocument()
  })

  test('renders all photo cards', () => {
    render(<App />)

    expect(screen.getByText('Горный пейзаж')).toBeInTheDocument()
    expect(screen.getByText('Морской закат')).toBeInTheDocument()
    expect(screen.getByText('Городские огни')).toBeInTheDocument()
    expect(screen.getByText('Лесная тропинка')).toBeInTheDocument()
    expect(screen.getByText('Северное сияние')).toBeInTheDocument()
    expect(screen.getByText('Цветочное поле')).toBeInTheDocument()
  })

  test('renders footer', () => {
    render(<App />)

    expect(screen.getByText('Photo Gallery UI Library v1.0.0')).toBeInTheDocument()
    expect(screen.getByText('React + TypeScript + Vite')).toBeInTheDocument()
  })
})

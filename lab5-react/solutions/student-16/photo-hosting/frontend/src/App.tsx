import './App.css'
import '@photo-gallery/ui-library/style.css'
import { Gallery, PhotoCard } from '@photo-gallery/ui-library'

function App() {
  const photos = [
    {
      id: 1,
      title: 'Горный пейзаж',
      description: 'Красивый вид на заснеженные горные вершины на рассвете',
      author: 'Иван Петров',
      uploadDate: '2025-01-10',
      imageUrl: 'https://i.pinimg.com/736x/e5/c5/a8/e5c5a8d0555665531f67769bea69b831.jpg',
    },
    {
      id: 2,
      title: 'Морской закат',
      description: 'Живописный закат над океаном с яркими красками неба',
      author: 'Мария Сидорова',
      uploadDate: '2025-01-12',
      imageUrl: 'https://i.pinimg.com/736x/7a/d8/f7/7ad8f77aa986437a102f057979a927aa.jpg',
    },
    {
      id: 3,
      title: 'Городские огни',
      description: 'Ночной город с яркими огнями небоскрёбов',
      author: 'Алексей Смирнов',
      uploadDate: '2025-01-14',
      imageUrl: 'https://i.pinimg.com/736x/91/10/3c/91103c0c85856384782fd3ed21acd8a5.jpg',
    },
    {
      id: 4,
      title: 'Лесная тропинка',
      description: 'Уютная тропинка среди высоких деревьев осенью',
      author: 'Елена Козлова',
      uploadDate: '2025-01-15',
      imageUrl: 'https://s8.hostingkartinok.com/uploads/images/2019/02/a701f8f3b0aa192022824ea68d4fff07.png',
    },
    {
      id: 5,
      title: 'Северное сияние',
      description: 'Удивительное полярное сияние в ночном небе',
      author: 'Дмитрий Волков',
      uploadDate: '2025-01-16',
      imageUrl: 'https://i.pinimg.com/736x/8c/ba/54/8cba54e6cbae1e759c92fce62da1acab.jpg',
    },
    {
      id: 6,
      title: 'Цветочное поле',
      description: 'Бескрайнее поле с разноцветными полевыми цветами',
      author: 'Ольга Новикова',
      uploadDate: '2025-01-17',
      imageUrl: 'https://i.pinimg.com/736x/11/16/78/111678cdb65ad0a2482b8ce1038e604c.jpg',
    },
  ]

  return (
    <div className="app">
      <header className="app-header">
        <h1>Галерея фотографий</h1>
        <p>Демонстрация компонентов Gallery и PhotoCard</p>
      </header>

      <main className="app-main">
        <Gallery>
          {photos.map((photo) => (
            <PhotoCard
              key={photo.id}
              title={photo.title}
              description={photo.description}
              author={photo.author}
              uploadDate={photo.uploadDate}
              imageUrl={photo.imageUrl}
            />
          ))}
        </Gallery>
      </main>

      <footer className="app-footer">
        <p>Photo Gallery UI Library v1.0.0</p>
        <p>React + TypeScript + Vite</p>
      </footer>
    </div>
  )
}

export default App

export async function getServerSideProps() {
  // Редирект на /search при заходе на /
  return {
    redirect: {
      destination: '/search', // Перенаправляем на страницу поиска
      permanent: false, // Можно указать true, если это постоянный редирект
    },
  };
}

export default function Home() {
  return null; // Этот компонент не рендерится, так как выполняется редирект
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig,
  async redirects() {
    return [
      {
        source: '/Consulta',
        destination: '/404', // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: '/HistorialAcciones',
        destination: '/404', // Matched parameters can be used in the destination
        permanent: true,
      }
    ]
  }
}

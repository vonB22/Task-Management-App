import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Tailwind CSS Test</h1>
          <p className="text-gray-600">Tailwind CSS is working!</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-100 text-red-800 p-4 rounded">Red Box</div>
            <div className="bg-blue-100 text-blue-800 p-4 rounded">Blue Box</div>
            <div className="bg-green-100 text-green-800 p-4 rounded">Green Box</div>
            <div className="bg-purple-100 text-purple-800 p-4 rounded">Purple Box</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

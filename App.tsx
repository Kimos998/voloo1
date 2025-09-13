
import React, { useState, useEffect, useCallback } from 'react';
import { SnippetDataItem } from './types';
import Tab from './components/Tab';
import SnippetCard from './components/SnippetCard';

const DATA_URL = 'https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLi93JBLSB4IT0P4nT365TCXHS0TRjov8iVjrVYc55sMGoa6JiPODu0q__mtAquGiWwYYxNG1dioxLKZw7wzvN7gZIMf4ciPrh88x-H4f6by9DCCc8X1j7MSBLClxQ_FwnU8Rsq2clgnh78wqzteJ6Afa9uKbzmi__ifIADp0O7J_VapyWwdvMvl0ksM4Bx5JdPa6KoBBbfAN_W9meqLl2cg33c1hTWIQDNvHr9veg6-kg_Su1Huf7o2ohEvrsPxLgHqQP-1rWjvOgN7PWT6gOx0_E3u3A&lib=My-GJsg477MHoHZ8h_bfYZO-TjKIvX8ZV';

const App: React.FC = () => {
  const [data, setData] = useState<SnippetDataItem[]>([]);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(DATA_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonData: SnippetDataItem[] = await response.json();
      // Filter out any entries where the category name is empty
      const filteredData = jsonData.filter(item => item[''] && item[''].trim() !== '');
      setData(filteredData);
    } catch (e) {
      if (e instanceof Error) {
        setError(`Failed to fetch data: ${e.message}`);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeItem = data[activeTab];

  const renderContent = () => {
    if (loading) {
      return <div className="text-center p-10">Loading snippets...</div>;
    }

    if (error) {
      return <div className="text-center p-10 text-red-500">{error}</div>;
    }

    if (!activeItem) {
      return <div className="text-center p-10">No snippets available for this category.</div>;
    }

    return (
      <div className="space-y-6">
        {activeItem.client && <SnippetCard title="Client" content={activeItem.client} />}
        {activeItem.vendeur && <SnippetCard title="Vendeur" content={activeItem.vendeur} />}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-200 p-4 sm:p-6 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap border-b border-gray-300">
          {data.map((item, index) => (
            <Tab
              key={index}
              label={item['']}
              isActive={index === activeTab}
              onClick={() => setActiveTab(index)}
            />
          ))}
        </div>
        <div className="bg-gray-100 p-4 sm:p-6 md:p-8 rounded-b-lg shadow-lg">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default App;

import { init, loadRemote } from '@module-federation/runtime';
import { useEffect, useState } from 'react';

function useDynamicImport({ module, scope }) {
  const [component, setComponent] = useState(null);

  useEffect(() => {
    if (!module || !scope) return;

    const loadComponent = async () => {
      try {
        const { default: Component } = await loadRemote(`${scope}/${module}`);
        setComponent(() => Component);
      } catch (error) {
        console.error(`Error loading remote module ${scope}/${module}:`, error);
      }
    };

    loadComponent();
  }, [module, scope]);

  return component;
}

function App() {
  const [{ module, scope }, setSystem] = useState({});
  const [loading, setLoading] = useState(false);

  const handleLoadRemote = async () => {
    const fetchRemotes = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return [
        {
          name: 'remoteApp',
          entry: 'http://localhost:5176/mf-manifest.json',
        },
      ];
    };
    setLoading(true);
    const remotes = await fetchRemotes();
    init({
      name: 'app1',
      remotes,
    });

    setSystem({
      scope: 'remoteApp',
      module: 'App1',
    });
    setLoading(false);
  };

  const Component = useDynamicImport({ module, scope });

  return (
    <div>
      <h1>Я - хост приложение</h1>
      <button onClick={handleLoadRemote}>Загрузить ремоут приложение</button>
      <div>
          {loading ? (
            'Загружаю ремоут приложение...'
          ) : Component && (
            <Component />
          )}
      </div>
    </div>
  );
}

export default App;
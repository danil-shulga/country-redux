import { useNavigate } from 'react-router-dom';

import { List } from '../components/List';
import { Card } from '../components/Card';
import { Controls } from '../components/Controls';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadCountries } from '../store/countries/countries-actions';
import {
  selectCountriesInfo,
  selectVisibleCountries,
} from '../store/countries/countries-selectors';
import { selectControls } from '../store/controls/controls-selectors';

export const HomePage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const controls = useSelector(selectControls);
  const countries = useSelector((state) =>
    selectVisibleCountries(state, controls)
  );
  const { status, error, qty } = useSelector(selectCountriesInfo);

  useEffect(() => {
    if (!qty) {
      dispatch(loadCountries());
    }
  }, [qty]);

  return (
    <>
      <Controls />

      {error && <h2>loading error</h2>}
      {status === 'loading' && <h2>loading ... </h2>}

      {status === 'received' && (
        <List>
          {countries.map((c) => {
            const countryInfo = {
              img: c.flags.png,
              name: c.name,
              info: [
                {
                  title: 'Population',
                  description: c.population.toLocaleString(),
                },
                {
                  title: 'Region',
                  description: c.region,
                },
                {
                  title: 'Capital',
                  description: c.capital,
                },
              ],
            };

            return (
              <Card
                key={c.name}
                onClick={() => navigate(`/country/${c.name}`)}
                {...countryInfo}
              />
            );
          })}
        </List>
      )}
    </>
  );
};

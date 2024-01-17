import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPokemon } from '../../redux/actions';
import style from './CreateForm.module.css';
import { Link } from 'react-router-dom';

const CreateForm = () => {
  const dispatch = useDispatch();
  const newPokemon = useSelector((state) => state.newPokemon);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: 'UPDATE_NEW_POKEMON',
      payload: {
        ...newPokemon,
        [name]: value,
      },
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      dispatch({
        type: 'UPDATE_NEW_POKEMON',
        payload: {
          ...newPokemon,
          image: reader.result, 
        },
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createPokemon(newPokemon));
      setMessage('El Pokémon se ha creado exitosamente.');
    } catch (error) {
      // Modifica este bloque para manejar errores específicos y proporcionar mensajes más informativos
      if (error.response && error.response.data) {
        setMessage(`Error al crear el Pokémon: ${error.response.data}`);
      } else {
        setMessage('Error al crear el Pokémon. Por favor, verifica los datos.');
      }
    }
  };

  return (
    <div className={style.background}>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={newPokemon.name} onChange={handleChange} />
        </label>
        <label>
          Image:
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {newPokemon.image && (
            <img
              src={newPokemon.image}
              alt="Selected Pokemon"
              style={{ width: '100px', height: '100px' }}
            />
          )}
        </label>
        <label>
          Life:
          <input type="number" name="life" value={newPokemon.life} onChange={handleChange} />
        </label>
        <label>
          Attack:
          <input type="number" name="attack" value={newPokemon.attack} onChange={handleChange} />
        </label>
        <label>
          Defense:
          <input type="number" name="defense" value={newPokemon.defense} onChange={handleChange} />
        </label>
        <label>
          Types:
          <input type="text" name="types" value={newPokemon.types} onChange={handleChange} />
        </label>
        <button type="submit">Crear Pokémon</button>
      </form>

      {message && <p className={message.startsWith('Error') ? style.error : style.success}>{message}</p>}
      <Link to={'/home'}><button>Home</button></Link>
    </div>
  );
};

export default CreateForm;

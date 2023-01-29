class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public';
  _apiKey = 'apikey=47ad4555e68c39038f73f4d83ebf5ec4';

   getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      console.log('error');
    }

    return await res.json();
  }

  getAllCharacters = async () => {
    const res = await this.getResource(`${this._apiBase}/characters?limit=9&offset=210&${this._apiKey}`);

    return res.data.results.map(this._transformCharacter);
  }

  getCharacter = async (id) => {
    const res = await this.getResource(`${this._apiBase}/characters/${id}?${this._apiKey}`);

    return this._transformCharacter(res.data.results[0]);
  }

  _transformCharacter = (char) => {
    return {
      name: char.name,
      description: char.description,
      thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url
    }
  }
}

export default MarvelService;
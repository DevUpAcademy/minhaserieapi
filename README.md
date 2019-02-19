# Minha Serie | API

[![N|DevUpAcademy](https://raw.githubusercontent.com/DevUpAcademy/minhaserieapi/master/src/img/devup.png)](https://github.com/devupacademy)

Está é uma API não oficial, desenvolvida para testes de extração de series resultantes do [Minha Series](https://www.minhaserie.com.br "Site de Series").

### Instalação

Clone o repo, instale as dependencias e inicie o server.

```sh
$ git clone https://github.com/DevUpAcademy/minhaserieapi.git
$ cd minhaserieapi
$ npm install
$ npm run dev
```
Acesse então no navegador por exemplo:
```sh
localhost:3000/search/vikings
```
Retornará como resultado:

```json
"results": [
    {
      "title": "Vikings",
      "category": "Ação/Aventura",
      "thumb": "https://assets2.minhaserie.com.br/images/highlights/000/017/148/thumb_740.jpg",
      "name": "740-vikings",
      "link": "https://www.minhaserie.com.br/serie/740-vikings",
      "stars": 5,
      "stars-width": "100%",
      "visits": "402810"
    },
    {
      "title": "The Last Kingdom",
      "category": "Ação/Aventura, Drama",
      "thumb": "https://assets3.minhaserie.com.br/images/highlights/000/024/564/thumb_1156.jpg",
      "name": "1156-the-last-kingdom",
      "link": "https://www.minhaserie.com.br/serie/1156-the-last-kingdom",
      "stars": 5,
      "stars-width": "100%",
      "visits": "25355"
    }
  ],
"count": 2
```


### Rotas

Estas são as rotas da API

* Listar Top Series (15) > **_/series_**:
    * GET https://minhaserieapi.herokuapp.com/series
* Pesquisar por serie > **_/search/:name_**
	* GET https://minhaserieapi.herokuapp.com/search/vikings
* Ver mais informações da serie > **_/serie/:name_in_site_**
	* GET https://minhaserieapi.herokuapp.com/serie/740-vikings
		* *_name_in_site_* pode ser encontrado como retorno de /search/:name como **name**

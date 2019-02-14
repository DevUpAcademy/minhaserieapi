---
title: Minha Serie API
template: templates/base.pug
---


# Minha Serie | API

[![N|DevUpAcademy](https://raw.githubusercontent.com/DevUpAcademy/minhaserieapi/master/src/img/devup.png)](https://github.com/devupacademy)

Está é uma API não oficial, desenvolvida para testes de extração de series resultantes do [Minha Series](https://www.minhaserie.com.br "Site de Series").

### Instalação

Clone o repo, instale as dependencias e inicie o server.

```sh
$ git clone https://github.com/DevUpAcademy/minhaserieapi.git
$ cd minhaserieapi
$ npm install
$ npm start
```
Acesse então no navegador por exemplo:
```sh
localhost:3000/serie/robot
```
Retornará como resultado:

```json
	{
	"results": [
	{
		"title": "Mr. Robot",
		"category": "Drama",
		"thumb": "https://assets2.minhaserie.com.br/images/highlights/000/022/668/thumb_1067.jpg",
		"stars": 5,
		"stars-width": "100%",
		"visits": "100105"
		}
	],
	"count": 1
	}
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
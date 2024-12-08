# Projet React : Pokédex

## Sommaire

- [Contexte du projet](#contexte-du-projet)
- [Outils mis à disposition](#outils-mis-à-disposition)
- [Fonctionnalités implémentées](#fonctionnalités-implémentées)
    - [Listing des Pokémon](#listing-des-pokémon)
    - [Consultation des données d'un Pokémon](#consultation-des-données-dun-pokémon)
    - [Gestion de l'équipe](#gestion-de-léquipe)
    - [Consultation de l'équipe](#consultation-de-léquipe)
- [Améliorations à faire](#améliorations-à-faire)
    - [Gestion des variantes de Pokémon](#gestion-des-variantes-de-pokémon)
    - [Création d'une API pour rendre l'application plus sécurisante](#création-dune-api-pour-rendre-lapplication-plus-sécurisante)

## Contexte du projet

__"Bienvenue dans le monde du développement ! Votre aventure commence maintenant."__

CODA, notre mentor de cette aventure, nous a confié une mission : développer un Pokédex interactif en cinq jours.

L'apparence ? Pas important. La fonctionnalité ? Primordiale. Les bonnes pratiques ? Obligatoires.

Ce projet a été l’occasion de sortir nos talents de développeur pour relever ce défi. Spoiler : on a réussi à capturer plus de fonctionnalités que prévu !

## Outils mis à disposition

Pour surmonter ce défi, nous avons eu accès à plusieurs outils pour nous faciliter la tâche !

Nous avions notamment le choix entre deux API afin de récupérer les données concernant nos très cher Pokémon :
- [PokéAPI](https://pokeapi.co/docs/v2)
- Une API légère personnalisée

Personnellement, j'ai décidé d'utiliser PokéAPI.

Plusieurs raisons explique ce choix :
- L'API propose une base de données complètes et très fournies sur les Pokémon et leur univers
- Elle est facile à utiliser puisque les données sont structurées au format JSON
- Elle me permettait de récupérer soit des données globales, soit des données précises en fonction de mes requêtes

Bien sûr, elle présente aussi son lot d'inconvénients mais celui que j'ai le mieux retenu est que ses performances peuvent se retrouver limitées lorsque plusieurs requêtes sont envoyées simultanément.

## Fonctionnalités implémentées
### Listing des Pokémon

Que serait un Pokédex si nous ne pouvions pas visualiser nos adorables petits compagnons ? La réponse est simple, ça n'en serait pas un !

La page d'accueil de notre Pokédex interactif propose une liste de Pokémon à explorer. Libre à vous d'effectuer une recherche précise en saisissant le nom d'un Pokémon dans la barre de recherche, ou même de filtrer la liste des Pokémon en fonction du type !

En cliquant sur un Pokémon de la liste, vous serez redirigé vers une page dédiée affichant toutes les informations détaillées sur ce Pokémon. Une navigation simple et intuitive pour plonger dans l’univers Pokémon !

### Consultation des données d'un Pokémon

Une fois rendu sur la page de votre Pokémon préféré, vous avez accès à plusieurs informations le concernant !

Vous pouvez facilement visualiser :
- Son nom en français
- Son apparence (normale ou shiny ✨)
- Les différences physiques entre les mâles et les femelles (du moins s'il y en a !)
- Sa description suivant la génération que vous sélectionnerez (Attention ! Certaines générations ne proposent pas de description en français...)
- Son ou ses type(s)
- Ses stats de base (Et oui, la prise de Zinc n'est pas prise en compte...)

### Gestion de l'équipe

Une particularité de notre Pokédex est que vous pouvez constituer votre propre équipe !

Il est très simple d'ajouter votre ou vos Pokémon adorés à votre équipe. Il vous suffit de vous rendre sur la page de consultation du Pokémon que vous souhaitez ajouter, en haut de la page (juste à côté de son nom) se trouve un petit bouton "Ajouter à l'équipe", cliquez dessus et le tour est joué !

Attention cependant à bien sélectionner vos Pokémon, car vous ne pourrez en ajouter que six à votre équipe !

Pour supprimer un Pokémon de votre équipe, ce n'est pas non plus sorcier. Rendez-vous sur la page de consultation de votre équipe et cliquez simplement sur le bouton "Supprimer de l'équipe" en-dessous du Pokémon que vous souhaitez retirer. 

### Consultation de l'équipe

Pour consulter votre équipe, il vous suffit de cliquer sur "Equipe" dans la barre de navigation pour atterrir sur la page correspondante.

Sur cette page, vous pourrez visualiser les Pokémon qui constituent votre équipe mais pas que !

Vous avez aussi la possibilité de voir la moyenne de toutes leurs statistiques à côté de l'équipe ! Pratique pour construire la meilleure des équipes de tous les temps non ?

A vous de jouer !

## Améliorations à faire
### Gestion des variantes de Pokémon

Dans l'univers de Pokémon, il existe parfois pour un même Pokémon, plusieurs variantes.

Prenons l'exemple de Cheniti. Ce petit Pokémon insecte que l'on rencontre généralement en début de route ne possède pas seulement une forme, mais bien trois différentes.

C'est simple à l'oeil humain de les différencier. Nous avons un énorme indice qui se trouve être leurs couleurs ! Nous savons qu'il y a un Cheniti rose, un autre beige et un dernier vert. Mais qu'en est-il de notre Pokédex ?

Pour le moment, notre Pokédex est bien incapable de récupérer et d'afficher les variantes de Pokémon. Cependant, un jour peut-être, il en sera capable.

### Création d'une API pour rendre l'application plus sécurisante

A l'heure actuelle, c'est le navigateur qui réalise toutes les requêtes vers la PokéAPI. Ce qui fait que les requêtes sont publiques et donc visibles par tous.

Pour le moment, l'API n'est pas encore réalisée, par peur de casser le code déjà réalisé. Cependant, il s'agit d'une amélioration qu'il faudra mettre en place rapidement afin de rendre le Pokédex plus propre et sécurisé.

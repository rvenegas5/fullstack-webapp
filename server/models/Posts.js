module.exports = (sequelize, DataTypes) => {

  // Creo la estrucctura de la tabla de la siguiente forma
  const Posts = sequelize.define("Posts", {
    title: {      // Defino la columna de mi tabla como un objeto
      type: DataTypes.STRING,       // Defino el tipo de dato de mi columna
      allowNull: false        // Defino si la columna puede tener datos nulos  
    },
    postText: { 
      type: DataTypes.STRING, 
      allowNull: false  
    },
    username: { 
      type: DataTypes.STRING, 
      allowNull: false  
    }
  })
  // Relaciones entre tablas con sequelize
  Posts.associate = (models) => {
    Posts.hasMany(models.Comments, {
      onDelete: "cascade"
    })
  }
  // Retorno la tabla que quiero crear
  return Posts
}
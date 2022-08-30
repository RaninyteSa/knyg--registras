import { DataTypes } from 'sequelize'

const Posts = (sequelize) => {
    const Schema = {
        pavadinimas: {
            type: DataTypes.STRING, //=VARCHAR(255)
            allowNull: false //neleidžiamas tuščias laukas - Standartinė reikšmė true
        },
        autorius: {
           type: DataTypes.STRING, 
           allowNull: false

        } ,
        virselioAutorius: {

            type: DataTypes.TEXT //= TEXT
        },
        ISBN: {
            type: DataTypes.STRING
        },

        nuotrauka: {
            type: DataTypes.STRING, //=VARCHAR(255)
            allowNull: false
        }
    }

    return sequelize.define('posts', Schema)
}

export default Posts
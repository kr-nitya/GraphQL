const graphql = require('graphql');
const{GraphQLObjectType,GraphQLSchema,GraphQLInt,GraphQLString,GraphQLList}=graphql;
const UserType = new GraphQLObjectType({
    name:'user',
    fields:()=>({
        id:{type:GraphQLInt},
        name:{type:GraphQLString}
    })
})
const RootQuery = new GraphQLObjectType({
    name:'Nitya',
    fields:{
        codeimprove:{
            type:new GraphQLList(UserType),
            resolve(parent,args){
                let data = {
                    id:23,
                    name:'Nitya Makwana'
                }
                return [data]
            }
        }
    }
})
module.exports = new GraphQLSchema({query:RootQuery})
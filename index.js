//password Node123456

const express = require('express');
const mongoose = require('mongoose');
const Product = require('./product');
 const app = express();

 app.use(express.json());

 app.use(express.urlencoded({
    extended : true
 }))


 const productData = []

//  mongodb+srv://amrellahdelil:<password>@cluster0.hsssurx.mongodb.net/?retryWrites=true&w=majority

mongoose.set('strictQuery', true)
// connect to mongoose
mongoose.connect('mongodb+srv://amrellahdelil:Node123456@cluster0.hsssurx.mongodb.net/flutter-node').then(
        ()=>{
            console.log('mongoose connected successfully');

             // post api
            app.post("/api/add_product", async(req, res)=>{

                let data = Product(req.body)

                try{
                    let dataToStore = await data.save();
                    res.status(200).json(dataToStore)
                }catch(err){
                    res.status(400).json({
                        'status' : err.message
                    })
                }

                // const pData = {
                //     "id" : productData.length+1,
                //     "pname" : req.body.pname,
                //     "pprice" : req.body.pprice,
                //     "pdesc" : req.body.pdesc, 
                // };


                // productData.push(pData);

                // res.status(200).send({
                //     "status_code" : 200,
                //     "message" : "Product added successfully",
                //     "product" : pData
                // })

            })
            
            
            //get api
            app.get('/api/get_product', async(req,res)=>{
                
                try{
                    let pData = await Product.find();
                    res.status(200).json(pData)
                }catch(err){
                    res.status(400).json({
                        'status' : err.message
                    })
                }

                // if(productData.length > 0){
                //     res.status(200).send({
                //     'status_code' : 200,
                //     'product_data' : productData
                // })
                // }
                // else{
                //     res.status(200).send({
                //     'status_code' : '200',
                //     'product_data' : []
                // })
                // }
            })

            //update api with put (to change all the data of an item)
            // app.put('/api/update/:id', (req,res)=>{
            //     var id = req.params.id * 1;
            //     var productToUpdate = productData.find(p=>p.id === id);

            //     var index = productData.indexOf(productToUpdate);

            //     const pData = {
            //         "id" : req.body.id * 1,
            //         "pname" : req.body.pname,
            //         "pprice" : req.body.pprice,
            //         "pdesc" : req.body.pdesc, 
            //     };
                
            //     productData[index] = pData;
            //     res.status(200).send({
            //         'status' : 200,
            //         'message' : 'Updated successfully'
            //     })
            // })

            //update api with patch (to change a specific field of an item)
            app.patch('/api/update/:id', async(req,res)=>{
                let id = req.params.id;
                let updatedData = req.body;
                let option = {new : true};
                
                
                try{
                    let pData = await Product.findByIdAndUpdate(id, updatedData, option);
                    res.status(200).send({
                        "status" : "Updated successfully",
                        "pData" : pData})
                }catch(err){
                    res.status(400).json({
                        'status' : err.message
                    })
                }
                
            })

            //delete api
            app.delete('/api/delete/:id', async(req,res)=>{

                let id = req.params.id;
                
                try{
                    let pData = await Product.findByIdAndDelete(id);
                    res.status(200).send({
                        "status" : "Deleted successfully",
                        "pData" : pData})
                }catch(err){
                    res.status(400).json({
                        'status' : err.message
                    })
                }

                // var id = req.params.id * 1;
                // var productToUpdate = productData.find(p=>p.id === id);

                // var index = productData.indexOf(productToUpdate);

                // productData.splice(index,1);

                // res.status(200).send({
                //     'status' : 200,
                //     'message' : 'deleted successfully'
                // })
            })
        },
        err=>{
            console.log(err);
        }
    )


app.listen(2000, ()=>{
    console.log('connected succefully');
})
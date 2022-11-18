import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { ApiService } from '../services/product.service';
import { MAT_DIALOG_DATA , MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  productForm !: FormGroup
  actionBtn : string = "Save"
  constructor(private formBuilder : FormBuilder , private api : ApiService, @Inject(MAT_DIALOG_DATA) public editData : any , private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      title : ['',Validators.required],
      price : ['',Validators.required],
      description : ['',Validators.required],
    });
    if(this.editData){
      this.actionBtn = "Update";
      this.productForm.controls['title'].setValue(this.editData.title);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['description'].setValue(this.editData.description);
    }
  }


  
  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
        this.api.post(this.productForm.value)
        .subscribe({
          next:(res)=>{
            alert("Product Added Succesfully")
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error:(err)=>{
            alert("Error !");
            console.log(err);
          }
        })
      }
    }else{
      this.updateProduct()
    }


  }

  updateProduct(){
    this.api.update(this.productForm.value , this.editData._id)
    .subscribe({
      next:(res) =>{
        alert("Product updated!");
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error updating")
      }
    })
  }
}

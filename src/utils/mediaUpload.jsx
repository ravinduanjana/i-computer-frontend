import { useState } from "react"
import { createClient, SupabaseClient } from "@supabase/supabase-js"
import { create } from "axios"

const supabaseUrl="https://onewzsvlrvqvonnhfeaq.supabase.co"
const supabaseKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uZXd6c3ZscnZxdm9ubmhmZWFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ4NTc1NjksImV4cCI6MjExMDQzMzU2OX0.4aSkSqUpNrocyiDTdHvGMF1DhMzb9bwut7fk2mYnwyk"


//sb_publishable_4Ulhpsm-jWD8_X88mMjfeA_ffWWp9Ux
const supabase = createClient(supabaseUrl , supabaseKey) //connection eka hadagnno supabase ekath ekka


//image ekak upload krnna me function eka hdnne.

export default function uploadFile(file){
    return new Promise (
        (resolve, reject)=>{

            if(file==null){
                reject("no file provided")
                return
            }
// image ekak nethuwa upload btn eka click kroth no file pprovided kiyl print wela ethnin nawthino code eka run wena eka,

        const timestamp = new Date().getTime()  //supabase ekt upload krn hema imge name ekakma unique wenna one e nisa, imge eka nama mulata eka upload krna time ekath add krgnno.
        const fileName = timestamp + "-" + file.name
            
                                //images kiuwe supabase eke hdpu bucket eke nama,
      supabase.storage.from("images").upload(fileName , file, {
        upsert : false,
        cacheControl : 3600
        }
    
    ).then(
        ()=>{
            const url= supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl
            resolve(url)
        }
    ).catch(
        ()=>{
            reject("failed to upload file")
        }
    )
    

    });

        }
    
Prerequisites: 
1. Node.js should be installed. 
2. MySql should be installed. 


Steps: 
1. Dump the DB related schema to get the application with some initial data. 
2. Command to import.  
    
        1. Create Database first from the client command line. 
                 
            $ CREATE database readyassist     

        2. Import the dump   
               
            $ mysql -u root -p'mynewpassword' readyassist2 < readyassist.sql

        3. Import this postman collection     https://www.getpostman.com/collections/99eb30b0db81859079f1


3. The URL which work without Token      

            1. api/customer/register      

            2. api/customer/sendotp      

            3. api/customer/validateotp  
                
            4. api/driver/register   
               
            5. api/driver/sendotp  
                
            6. api/driver/validateotp           
            
4. Note the other API needs to have token_access in the header. user "api/customer/sendotp" and "api/customer/validateotp" to get the token. 
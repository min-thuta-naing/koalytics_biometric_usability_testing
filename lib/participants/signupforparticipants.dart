import 'package:flutter/material.dart';
import 'package:koalytics_biometric_usability_testing/home_researcher.dart';


class SignUpPageParticipant extends StatefulWidget {
 const SignUpPageParticipant({super.key});


 @override
 _SignUpPageParticipant createState() => _SignUpPageParticipant();
}


class _SignUpPageParticipant extends State<SignUpPageParticipant> {
 final _formKey = GlobalKey<FormState>();
 final TextEditingController _nameController = TextEditingController();
 final TextEditingController _emailController = TextEditingController();
 final TextEditingController _passwordController = TextEditingController();
 final TextEditingController _confirmPasswordController = TextEditingController();


 @override
 Widget build(BuildContext context) {
   return Scaffold(
     appBar: AppBar(
       title: const Text(
         'Sign Up as Participant',
         style: TextStyle(
           fontSize: 18,
           fontFamily: "Tommy",
           fontWeight: FontWeight.bold,
         ),
       ),
       backgroundColor: Color.fromARGB(255, 117, 184, 232),
     ),
     body: SingleChildScrollView(
       child: Padding(
         padding: const EdgeInsets.all(20.0),
         child: Form(
           key: _formKey,
           child: Column(
             crossAxisAlignment: CrossAxisAlignment.center,
             children: [
               Image.asset('assets/participant.png', width: 100, height: 200),
               const Text(
                 'Create an Account',
                 style: TextStyle(
                   fontSize: 18,
                   fontFamily: "Tommy",
                   fontWeight: FontWeight.bold,
                 ),
               ),
               const SizedBox(height: 20),
              
               TextFormField(
                 controller: _nameController,
                 decoration: const InputDecoration(
                   labelText: 'Full Name',
                   border: OutlineInputBorder(),
                   labelStyle: TextStyle(
                     fontFamily: 'Tommy',
                     fontSize: 16,
                     fontWeight: FontWeight.bold,
                   ),
                 ),
                 validator: (value) {
                   if (value == null || value.isEmpty) {
                     return 'Please enter your name';
                   }
                   return null;
                 },
               ),
               const SizedBox(height: 15),
              
               TextFormField(
                 controller: _emailController,
                 decoration: const InputDecoration(
                   labelText: 'Email',
                   border: OutlineInputBorder(),
                   labelStyle: TextStyle(
                     fontFamily: 'Tommy',
                     fontSize: 16,
                     fontWeight: FontWeight.bold,
                   ),
                 ),
                 keyboardType: TextInputType.emailAddress,
                 validator: (value) {
                   if (value == null || value.isEmpty) {
                     return 'Please enter your email';
                   } else if (!RegExp(r'^[^@]+@[^@]+\.[^@]+').hasMatch(value)) {
                     return 'Enter a valid email';
                   }
                   return null;
                 },
               ),
               const SizedBox(height: 15),
              
               TextFormField(
                 controller: _passwordController,
                 decoration: const InputDecoration(
                   labelText: 'Password',
                   border: OutlineInputBorder(),
                   labelStyle: TextStyle(
                     fontFamily: 'Tommy',
                     fontSize: 16,
                     fontWeight: FontWeight.bold,
                   ),
                 ),
                 obscureText: true,
                 validator: (value) {
                   if (value == null || value.isEmpty) {
                     return 'Please enter a password';
                   } else if (value.length < 6) {
                     return 'Password must be at least 6 characters';
                   }
                   return null;
                 },
               ),
               const SizedBox(height: 15),
              
               TextFormField(
                 controller: _confirmPasswordController,
                 decoration: const InputDecoration(
                   labelText: 'Confirm Password',
                   border: OutlineInputBorder(),
                   labelStyle: TextStyle(
                     fontFamily: 'Tommy',
                     fontSize: 16,
                     fontWeight: FontWeight.bold,
                   ),
                 ),
                 obscureText: true,
                 validator: (value) {
                   if (value != _passwordController.text) {
                     return 'Passwords do not match';
                   }
                   return null;
                 },
               ),
               const SizedBox(height: 20),
              
               ElevatedButton(
                 onPressed: () {
                   if (_formKey.currentState!.validate()) {
                     Navigator.pushReplacement(
                       context,
                       MaterialPageRoute(builder: (context) => const HomeResearcher()),
                     );
                   }
                 },
                 style: ElevatedButton.styleFrom(
                   primary: Color.fromARGB(255, 117, 184, 232),
                   onPrimary: Colors.black,
                   shadowColor: Color.fromARGB(255, 57, 114, 74),
                   elevation: 2,
                   shape: RoundedRectangleBorder(
                     borderRadius: BorderRadius.circular(4),
                   ),
                   minimumSize: Size(200, 50),
                 ),
                 child: const Text(
                   'Sign Up',
                   style: TextStyle(
                     fontSize: 18,
                     fontFamily: "Tommy",
                     fontWeight: FontWeight.bold,
                   ),
                 ),
               ),
             ],
           ),
         ),
       ),
     ),
   );
 }
}

import 'package:flutter/material.dart';
import 'package:koalytics_biometric_usability_testing/researcher.dart'; // Updated to navigate directly


class SignUpPageResearcher extends StatefulWidget {
 const SignUpPageResearcher({super.key});


 @override
 _SignUpPageResearcher createState() => _SignUpPageResearcher();
}


class _SignUpPageResearcher extends State<SignUpPageResearcher> {
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
         'Sign Up as Researcher',
         style: TextStyle(
           fontSize: 18,
           fontFamily: "Tommy",
           fontWeight: FontWeight.bold,
         ),
       ),
       backgroundColor: Color.fromARGB(255, 117, 232, 151), // Customize app bar color
     ),
     body: SingleChildScrollView( 
       child: Padding(
         padding: const EdgeInsets.all(20.0),
         child: Form(
           key: _formKey,
           child: Column(
             crossAxisAlignment: CrossAxisAlignment.center,
             children: [
               Image.asset('assets/researcher.png', width: 100, height: 200),
               const Text(
                 'Create an Account',
                 style: TextStyle(
                   fontSize: 18,
                   fontFamily: "Tommy",
                   fontWeight: FontWeight.bold,
                 ),
               ),
               const SizedBox(height: 20),


               // Name Field
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


               // Email Field
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


               // Password Field
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


               // Confirm Password Field
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


               // Sign Up Button with Sliding Transition
               ElevatedButton(
                 onPressed: () {
                   if (_formKey.currentState!.validate()) {
                     _navigateToResearcherDashboard();
                   }
                 },
                 style: ElevatedButton.styleFrom(
                   primary: Color.fromARGB(255, 117, 232, 151),
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


 void _navigateToResearcherDashboard() {
   Navigator.push(
     context,
     PageRouteBuilder(
       transitionDuration: const Duration(milliseconds: 300),
       pageBuilder: (context, animation, secondaryAnimation) => const ResearcherLanding(), // Now directly linked
       transitionsBuilder: (context, animation, secondaryAnimation, child) {
         const begin = Offset(1.0, 0.0);
         const end = Offset.zero;
         const curve = Curves.easeInOut;


         var tween = Tween(begin: begin, end: end).chain(CurveTween(curve: curve));
         var offsetAnimation = animation.drive(tween);


         return SlideTransition(
           position: offsetAnimation,
           child: child,
         );
       },
     ),
   );
 }
}

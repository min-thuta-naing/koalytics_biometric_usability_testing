import 'package:flutter/material.dart';
import 'researchers/signupforresearchers.dart';
import 'participants/signupforparticipants.dart';

class PreSignUp extends StatelessWidget {
  const PreSignUp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      //appBar: AppBar(title: const Text('Home Page')),
      backgroundColor: Color.fromARGB(255, 209, 243, 217), // Background color

      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [

            //button for researcher 
            _buildButton(context, 'Sign Up as Researcher', Color.fromARGB(255, 117, 232, 151), const SignUpPageResearcher()),
            //spacing
            const SizedBox(height: 20),
            // //image for researchers
            // Image.asset('assets/researcher.png', width: 250, height: 250),
            // //explanation for researchers
            // const Text(
            //     'If you are a researcher performing the UIUX research, you can register the account by clicking the sign up as a researcher. ',
            //     style: TextStyle(
            //       fontSize: 15,
            //       fontFamily: 'IntroHeadR',
            //     ),
            // ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,  // Centers the content horizontally
              children: [
                // Image for researchers
                Image.asset('assets/researcher.png', width: 100, height: 100),
                const SizedBox(width: 20),  // Adds space between the image and text
                // Explanation for researchers
                const Text(
                  'If you are a researcher performing \nthe UIUX research, \nyou can register the account \nby clicking the sign up as a researcher.',
                  style: TextStyle(
                    fontSize: 15,
                    fontFamily: "Tommy",
                    fontWeight: FontWeight.bold,                  
                  ),
                ),
              ],
            ),

            const SizedBox(height: 20,),
            _buildButton(context, 'Sign Up as Participant', Color.fromARGB(255, 117, 184, 232), const SignUpPageParticipant()),
            
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,  // Centers the content horizontally
              children: [
                // Image for researchers
                Image.asset('assets/participant.png', width: 100, height: 100),
                const SizedBox(width: 20),  // Adds space between the image and text
                // Explanation for researchers
                const Text(
                  'If you are a participant of \nthe research, \nyou can register the account \nby clicking the sign up as a participant.',
                  style: TextStyle(
                    fontSize: 15,
                    fontFamily: "Tommy",
                    fontWeight: FontWeight.bold,                  
                  ),
                ),
              ],
            ),

            const SizedBox(height: 100),
            CircleAvatar(
              radius: 25,
              backgroundColor: Color.fromARGB(255, 232, 144, 117),
              child: IconButton(
                icon: const Icon(Icons.arrow_back, color: Colors.black),
                onPressed: () {
                  Navigator.pop(context);
                },
              ),
            ),
            
            const SizedBox(height: 80),

          ],
        ),
      ),
    );
  }

  Widget _buildButton(BuildContext context, String text, Color color, Widget page) {
    return ElevatedButton(
      onPressed: () {
        Navigator.push(
          context,
          PageRouteBuilder(
            transitionDuration: const Duration(milliseconds: 500),
            pageBuilder: (context, animation, secondaryAnimation) => page,
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
      },
      style: ElevatedButton.styleFrom(
        primary: color,
        onPrimary: Colors.black,
        shadowColor: Color.fromARGB(255, 57, 114, 74),        
        elevation: 2,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(4),
        ),
        minimumSize: const Size(250, 50),
      ),
      child: Text(
        text,
        style: const TextStyle(
          fontSize: 18,
          fontFamily: "Tommy",
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }
}


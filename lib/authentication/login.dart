import 'package:flutter/material.dart';
import 'package:koalytics_biometric_usability_testing/authentication/sign_up.dart';
import 'package:koalytics_biometric_usability_testing/researchers/researcher_dashboard.dart';
import 'welcome.dart';
import '../participants/loginforparticipants.dart'; 


class SignInPage2 extends StatelessWidget {
  const SignInPage2({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final bool isSmallScreen = MediaQuery.of(context).size.width < 600;

    return Scaffold(

      //app bar 
      appBar: AppBar(
        automaticallyImplyLeading: false,
        title: const Text(
          'Log In',
          style: TextStyle(
            fontSize: 20,
            fontFamily: "Tommy",
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
        body: Center(
          child: isSmallScreen
            ? Column(
                mainAxisSize: MainAxisSize.min,
                children: const [
                  _Logo(),
                  _FormContent(),
                ],
              )
              : Container(
                  padding: const EdgeInsets.all(32.0),
                  constraints: const BoxConstraints(maxWidth: 800),
                  child: Row(
                    children: const [
                      Expanded(child: _Logo()),
                      Expanded(
                        child: Center(child: _FormContent()),
                      ),
                    ],
                  ),
          )
        )
    );
  }
}

class _Logo extends StatelessWidget {
  const _Logo({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final bool isSmallScreen = MediaQuery.of(context).size.width < 600;

    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Padding(
          padding: const EdgeInsets.all(16.0),
          child: Text(
            "Welcome back to Koalytics!",
            style: isSmallScreen
                ? Theme.of(context).textTheme.titleLarge?.copyWith(
                    fontFamily: "Tommy",
                    fontWeight: FontWeight.bold,
                    fontSize: 18,
                  )
                : Theme.of(context).textTheme.titleMedium?.copyWith(
                    color: Colors.black,
                    fontFamily: "Tommy",
                    fontWeight: FontWeight.bold,
                    fontSize: 18,
                  ),
            textAlign: TextAlign.center,
          ),
        )
      ],
    );

  }
}

class _FormContent extends StatefulWidget {
  const _FormContent({Key? key}) : super(key: key);

  @override
  State<_FormContent> createState() => __FormContentState();
}

class __FormContentState extends State<_FormContent> {
  bool _isPasswordVisible = false;
  bool _rememberMe = false;

  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Container(
      constraints: const BoxConstraints(maxWidth: 300),
      child: Form(
        key: _formKey,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [

            //email text field 
            TextFormField(
              validator: (value) {
                // add email validation
                if (value == null || value.isEmpty) {
                  return 'Please enter your email';
                }

                bool emailValid = RegExp(
                        r"^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+")
                    .hasMatch(value);
                if (!emailValid) {
                  return 'Please enter a valid email';
                }

                return null;
              },
              decoration: InputDecoration(
                labelText: 'Email',
                hintText: 'Enter your email',
                prefixIcon: Icon(Icons.email_outlined),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(20.0),
                ),
              ),
            ),
            _gap(),

            //password text field 
            TextFormField(
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Please enter password';
                }

                if (value.length < 6) {
                  return 'Password must be at least 6 characters';
                }
                return null;
              },
              obscureText: !_isPasswordVisible,
              decoration: InputDecoration(
                  labelText: 'Password',
                  hintText: 'Enter your password',
                  prefixIcon: const Icon(Icons.lock_outline_rounded),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                  suffixIcon: IconButton(
                    icon: Icon(_isPasswordVisible
                        ? Icons.visibility_off
                        : Icons.visibility),
                    onPressed: () {
                      setState(() {
                        _isPasswordVisible = !_isPasswordVisible;
                      });
                    },
                  )),
            ),
            _gap(),

            //remember me check box 
            CheckboxListTile(
              value: _rememberMe,
              onChanged: (value) {
                if (value == null) return;
                setState(() {
                  _rememberMe = value;
                });
              },
              title: const Text('Remember me'),
              controlAffinity: ListTileControlAffinity.leading,
              dense: true,
              contentPadding: const EdgeInsets.all(0),
            ),
            _gap(),


            // Sign Up Button with Sliding Transition
            ElevatedButton(
              onPressed: () {
                if (_formKey.currentState!.validate()) {
                  _navigateToResearcherDashboard();
                }
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: Color.fromARGB(255, 90, 121, 201),
                foregroundColor: const Color.fromARGB(255, 255, 255, 255),
                //shadowColor: Color.fromARGB(255, 57, 114, 74),
                elevation: 2,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20),
                ),
                minimumSize: Size(200, 50),
              ),
              child: const Text(
                'Log In',
                style: TextStyle(
                  fontSize: 18,
                  fontFamily: "Tommy",
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),

            const SizedBox(height: 10), // Space between buttons
            TextButton(
              onPressed: () {
                // Navigate to the login page
                _navigateToSingUpPage();
              },
              child: Text(
                'Are you a new user? Sign up here.',
                style: TextStyle(
                  fontSize: 14,
                  color: Color.fromARGB(255, 90, 121, 201),
                ),
              ),
            ),



            // SizedBox(
            //   width: double.infinity,
            //   child: ElevatedButton(
            //     style: ElevatedButton.styleFrom(
            //       shape: RoundedRectangleBorder(
            //           borderRadius: BorderRadius.circular(4)),
            //     ),
            //     child: const Padding(
            //       padding: EdgeInsets.all(10.0),
            //       child: Text(
            //         'Sign in',
            //         style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            //       ),
            //     ),
            //     onPressed: () {
            //       if (_formKey.currentState?.validate() ?? false) {
            //         /// do something
            //       }
            //     },
            //   ),
            // ),
            // _gap(),
            // SizedBox(
            //   width: double.infinity,
            //   child: ElevatedButton(
            //     style: ElevatedButton.styleFrom(
            //       shape: RoundedRectangleBorder(
            //           borderRadius: BorderRadius.circular(4)),
            //     ),
            //     child: const Padding(
            //       padding: EdgeInsets.all(10.0),
            //       child: Text(
            //         'Login as Participant',
            //         style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            //       ),
            //     ),
            //     onPressed: () {
            //       Navigator.push(
            //         context,
            //         MaterialPageRoute(
            //             builder: (context) => const LoginAsParticipant()),
            //       );
            //     },
            //   ),
            // ),
            // _gap(),
            // SizedBox(
            //   width: double.infinity,
            //   child: ElevatedButton(
            //     style: ElevatedButton.styleFrom(
            //       shape: RoundedRectangleBorder(
            //           borderRadius: BorderRadius.circular(4)),
            //     ),
            //     child: const Padding(
            //       padding: EdgeInsets.all(10.0),
            //       child: Text(
            //         'Login as Researcher',
            //         style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            //       ),
            //     ),
            //     onPressed: () {
            //       /// Handle login as researcher
            //     },
            //   ),
            // ),
          ],
        ),
      ),
    );

    
  }

  void _navigateToSingUpPage(){
    Navigator.push(
      context, 
      PageRouteBuilder(
         transitionDuration: const Duration(milliseconds: 300),
        pageBuilder: (context, animation, secondaryAnimation) => const SignUpPage(), // Now directly linked
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

  void _navigateToResearcherDashboard() {
    Navigator.push(
      context,
      PageRouteBuilder(
        transitionDuration: const Duration(milliseconds: 300),
        pageBuilder: (context, animation, secondaryAnimation) => const ResearcherDashboard(), // Now directly linked
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

  Widget _gap() => const SizedBox(height: 16);
}

// import 'package:flutter/material.dart';

// class SusQuest extends StatefulWidget {
//   const SusQuest({super.key});

//   @override
//   State<SusQuest> createState() => _SusQuestState();
// }

// class _SusQuestState extends State<SusQuest> {
//   final List<int> _responses = List.filled(10, 3);
//   bool _showDescription = true;

//   final List<String> _questions = [
//       "I think I would like to use this LMS frequently.",
//     "I found the LMS unnecessarily complex.",
//     "I thought the LMS was easy to use.",
//     "I think that I would need the support of a technical person (OR) tutorial instruction video to use this LMS.",
//     "I found the various functions in this LMS were cohesive.",
//     "I thought there was too much inconsistency in this LMS.",
//     "I would imagine that most people would learn to use this LMS very quickly.",
//     "I found the LMS inconvenient to use.",
//     "I felt very confident using the LMS.",
//     "I needed to learn a lot of things about it before I could use this LMS system. ",

//   ];

//   @override
//   void initState() {
//     super.initState();
//     WidgetsBinding.instance.addPostFrameCallback((_) => _showDescriptionDialog());
//   }

//   void _showDescriptionDialog() {
//     showDialog(
//       context: context,
//       barrierDismissible: false,
//       builder: (BuildContext context) {
//         return AlertDialog(
//           title: const Text('SUS Questionnaire'),
//           content: const SingleChildScrollView(
//             child: Text(
//               'This SUS (System Usability Scale) questionnaire is designed to evaluate the usability of the system you just tested. '
//               'You will be presented with 10 statements about the system. '
//               'For each statement, please indicate your level of agreement on a scale from 1 (Strongly Disagree) to 5 (Strongly Agree).\n\n'
//               'Please be honest in your responses, as this will help improve the system.',
//             ),
//           ),
//           actions: <Widget>[
//             TextButton(
//               child: const Text('Start Questionnaire'),
//               onPressed: () {
//                 Navigator.of(context).pop();
//                 setState(() {
//                   _showDescription = false;
//                 });
//               },
//             ),
//           ],
//           shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
//         );
//       },
//     );
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: const Text('SUS Questionnaire'),
//         backgroundColor: Colors.blue,
//       ),
//       body: _showDescription
//           ? const Center(child: CircularProgressIndicator())
//           : ListView.builder(
//               itemCount: _questions.length,
//               itemBuilder: (context, index) {
//                 return Card(
//                   margin: const EdgeInsets.all(8),
//                   child: Padding(
//                     padding: const EdgeInsets.all(16),
//                     child: Column(
//                       crossAxisAlignment: CrossAxisAlignment.start,
//                       children: [
//                         Text(
//                           'Question ${index + 1}',
//                           style: const TextStyle(
//                             fontWeight: FontWeight.bold,
//                             fontSize: 16,
//                           ),
//                         ),
//                         const SizedBox(height: 8),
//                         Text(_questions[index]),
//                         const SizedBox(height: 16),
//                         Slider(
//                           value: _responses[index].toDouble(),
//                           min: 1,
//                           max: 5,
//                           divisions: 4,
//                           label: _responses[index].toString(),
//                           onChanged: (double value) {
//                             setState(() {
//                               _responses[index] = value.round();
//                             });
//                           },
//                         ),
//                         Row(
//                           mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                           children: const [
//                             Text('Strongly Disagree'),
//                             Text('Strongly Agree'),
//                           ],
//                         ),
//                       ],
//                     ),
//                   ),
//                 );
//               },
//             ),
//       floatingActionButton: FloatingActionButton(
//         onPressed: _showDescriptionDialog,
//         child: const Icon(Icons.info_outline),
//         backgroundColor: Colors.blue,
//       ),
//     );
//   }
// }


import 'package:flutter/material.dart';

class SusQuest extends StatefulWidget {
  const SusQuest({super.key});

  @override
  State<SusQuest> createState() => _SusQuestState();
}

class _SusQuestState extends State<SusQuest> {
  final List<TextEditingController> _controllers = List.generate(
      10, (index) => TextEditingController());

  final List<String> _defaultQuestions = [
    "I think I would like to use this LMS frequently.",
    "I found the LMS unnecessarily complex.",
    "I thought the LMS was easy to use.",
    "I think that I would need the support of a technical person (OR) tutorial instruction video to use this LMS.",
    "I found the various functions in this LMS were cohesive.",
    "I thought there was too much inconsistency in this LMS.",
    "I would imagine that most people would learn to use this LMS very quickly.",
    "I found the LMS inconvenient to use.",
    "I felt very confident using the LMS.",
    "I needed to learn a lot of things about it before I could use this LMS system.",
  ];

  @override
  void initState() {
    super.initState();
    for (int i = 0; i < _defaultQuestions.length; i++) {
      _controllers[i].text = _defaultQuestions[i];
    }
  }

  void _showDescriptionDialog() {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text(
            'SUS Questionnaire', 
            style: TextStyle(
              fontFamily: "Tommy",
              fontWeight: FontWeight.bold,
            ),
          ),
          content: const SingleChildScrollView(
            child: Text(
              'This SUS (System Usability Scale) questionnaire is designed to evaluate the usability of the system you just tested. '
              'You will be presented with 10 statements about the system, which you can modify if needed.\n\n'
              'Please ensure that the questions remain relevant to system usability.',
              style: TextStyle(
                fontFamily: "Tommy",
                fontWeight: FontWeight.bold,
            ),
            ),
          ),
          actions: <Widget>[
            TextButton(
              child: const Text('Close',
              style: TextStyle(
                    fontSize: 18,
                    fontFamily: "Tommy",
                    fontWeight: FontWeight.bold,
                  ),
              ),
              onPressed: () {
                Navigator.of(context).pop();
              },
              style: TextButton.styleFrom(
                backgroundColor: Color.fromARGB(255, 90, 121, 201),
                  foregroundColor: const Color.fromARGB(255, 255, 255, 255),
                  elevation: 2,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                  minimumSize: Size(100, 50),
              )
            ),
          ],
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'SUS Questionnaire', 
          style: TextStyle(
            fontFamily: "Tommy",
            fontSize: 25,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
        backgroundColor: Color.fromARGB(255, 90, 121, 201),
        iconTheme: const IconThemeData(
          color: Colors.white, // White back arrow
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: SingleChildScrollView(
          child: Column(
            children: [

              Text(
                '10 SUS questionnaire',
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                    fontFamily: "Tommy",
                  ),
              ),
              const SizedBox(height: 20),
              for (int index = 0; index < _controllers.length; index++) ...[
                // Text(
                //   'Question ${index + 1}',
                //   style: const TextStyle(
                //     fontWeight: FontWeight.bold,
                //     fontSize: 16,
                //     fontFamily: "Tommy",
                //   ),
                // ),
                const SizedBox(height: 8),
                TextField(
                  controller: _controllers[index],
                  decoration: InputDecoration(
                    labelText: 'Question ${index + 1}',
                    labelStyle: const TextStyle(
                      fontFamily: "Tommy",
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                    ),
                    filled: true,
                    fillColor: const Color.fromARGB(255, 235, 238, 250),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(20),
                      borderSide: BorderSide.none,
                    ),
                  ),
                  maxLines: 2,
                ),
                const SizedBox(height: 16),
              ],

              // Add the Start button here under the form
              Center(
                child: ElevatedButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => const SusQuest()),
                    );
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Color.fromARGB(255, 90, 121, 201),
                    foregroundColor: const Color.fromARGB(255, 255, 255, 255),
                    elevation: 2,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20),
                    ),
                    minimumSize: Size(200, 50),
                  ),
                  child: const Text(
                    'Start',
                    style: TextStyle(
                      fontSize: 18,
                      fontFamily: "Tommy",
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _showDescriptionDialog,
        child: const Icon(
          Icons.info_outline,
          color: Colors.white,  // Change icon color to white
        ),
        backgroundColor: const Color.fromARGB(255, 90, 121, 201),
        shape: const CircleBorder(),  // Ensures circular shape
      ),
    );
  }
}

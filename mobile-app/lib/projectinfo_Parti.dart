import 'package:flutter/material.dart';

class ProjectInfoParti extends StatelessWidget {
  const ProjectInfoParti({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Project Info Detail'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Project Information',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            const Text(
              'Researchers: Min, Soe, Shwe, Ruby. Participants: 247. Project: Egg Cracker. Description in Details: Cracking Eggs with a hammer in time period. ',
              style: TextStyle(fontSize: 16),
            ),
            const Spacer(),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () {
                  // Navigate to the next page
                },
                child: const Text('Next'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

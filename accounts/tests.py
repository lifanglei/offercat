from django.test import TestCase

# Create your tests here.
class myclass():
    name = 'ABFD'

    def show(self, times):
        for i in range(times):
            print(self.name)
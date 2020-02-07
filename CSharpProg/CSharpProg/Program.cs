using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSharpProg
{
    class Program
    {
        static int Main(string[] args)
        {
            if (args.Length != 2)
            {
                return 2;
            }
            string arg1 = args[0];
            int arg2 = 0;
            if (int.TryParse(args[1], out arg2))
            {
                Console.WriteLine("args {0} {1}", arg1, arg2);

                return 0;
            }
            return 1;
        }
    }
}

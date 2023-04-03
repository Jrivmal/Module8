import java.util.Random;

class Summation extends Thread {

private int[] arr;
//sum extends thread
private int low, high, partial;
//find sum of elements
public Summation(int[] arr, int low, int high)

{

this.arr = arr;

this.low = low;

this.high = Math.min(high, arr.length);

}

public int getPartialSum()

{

return partial;

}

public void run()

{

partial = sum(arr, low, high);

}
//find sum java array
public static int sum(int[] arr)

{

return sum(arr, 0, arr.length);

}

public static int sum(int[] arr, int low, int high)

{

int total = 0;

for (int i = low; i < high; i++) {

total += arr[i];

}

return total;

}

public static int parallelSum(int[] arr)

{

return parallelSum(arr, Runtime.getRuntime().availableProcessors());

}
//sum extends thread
public static int parallelSum(int[] arr, int threads)

{

int size = (int) Math.ceil(arr.length * 1.0 / threads);

Summation[] sums = new Summation[threads];

for (int i = 0; i < threads; i++) {

sums[i] = new Summation(arr, i * size, (i + 1) * size);

sums[i].start();

}

try {

for (Summation sum : sums) {

sum.join();

}

} catch (InterruptedException e) { }

int total = 0;

for (Summation sum : sums) {

total += sum.getPartialSum();

}

return total;

}

}

public class Parallel {

public static void main(String[] args)

{

Random random = new Random();
//200 million random number
int[] arr = new int[200000000];

for (int i = 0; i < arr.length; i++) {

arr[i] = random.nextInt(10) + 1;

}

long start = System.currentTimeMillis();

System.out.println(Summation.sum(arr));

System.out.println("Single Thread: " + (System.currentTimeMillis() - start));

start = System.currentTimeMillis();

System.out.println(Summation.parallelSum(arr));

System.out.println("Parallel Array: " + (System.currentTimeMillis() - start));

}

}

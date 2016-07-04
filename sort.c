/*
Input: unsorted array
1. Select pivot (generally last element)
2. Move pivot to its position in the array
3. Repeat step 1 for array beg-pivot and pivot-end
 */
#include <stdio.h>
#include <stdlib.h>
#define HOARE
//#define LOMUTO

int __parray(int *arr, int size)
{
	int i = 0;

	while(i < size) {
		printf("%d ", arr[i]);
		i++;
	}
	printf("\n");
	return;
}

void __swap(int *pos1, int *pos2)
{
	int temp = *pos1;
	*pos1 = *pos2;
	*pos2 = temp;
	return;
}

int __random(int min, int max)
{
	int rdm;
	// random max should be a multiple of new range
	int random_max = RAND_MAX - (RAND_MAX % (max - min + 1));
	srand(time(NULL));
	while (1) {
		rdm = rand();
		if (rdm <= random_max)
			break;
	}
	rdm = min + (rdm % (max - min + 1));
	return rdm;
}

int __lomuto_partition(int *arr, int beg, int end)
{
	if (beg < end) {

		int pivot_index = __random(beg, end);
		__swap(&arr[beg], &arr[pivot_index]);

		int pivot = arr[beg];
		int par = beg, i = 0;

		// traverse each element once
		// comparision on each element
		// swap a few in them
		// time complexity O(N)
		for (i = beg + 1; i <= end; i++) {
			if (arr[i] <= pivot) {
				par++;
				__swap(&arr[i], &arr[par]);
			}
		}
		__swap(&arr[par], &arr[beg]);
		return par;
	}
	else {
		return beg;
	}
}

int __hoare_partition (int *arr, int beg, int end)
{
	if (beg < end) {
		// doesn't work for pivot = arr[end]
		int pivot_index = __random(beg, end);
		__swap(&arr[beg], &arr[pivot_index]);

		int pivot = arr[beg];
		beg = beg - 1;
		end = end + 1;

		while (1) {
			do { ++beg;} while (arr[beg] < pivot);
			do { --end;} while (arr[end] > pivot);
			if (beg < end)
				__swap( &arr[beg], &arr[end]);
			else
				return end;
		}
	}
	return end;
}

void __qsort(int *arr, int beg, int end)
{
	int partition;

	// should not go ahead for one or less elements
	if (beg < end) {
#if defined(HOARE)
		partition = __hoare_partition(arr, beg, end);
		__qsort(arr, beg, partition);
#elif defined(LOMUTO)
		partition = __lomuto_partition(arr, beg, end);
		__qsort(arr, beg, partition - 1);
#endif
		__qsort(arr, partition + 1, end);
	}

	return;
}

#if 0
int HoarePartition (int a[],int p, int r) {
	int x=a[p], i=p-1, j=r+1;
	while (1) {
		do  i++; while (a[i] < x);
		do  j--; while (a[j] > x);
		if  (i < j)
			__swap(&a[i],&a[j]);
		else
			return j;
	}
}
#endif
void gm_qsort(int *arr, int size)
{
	if (!arr)
		return;
	// initiating qsort
	__qsort(arr, 0, size - 1);
	return;
}

int main()
{
	int a[][5] = {
		{ 1},
		{ 4, 1},
		{ 4, -5, -1},
		{ 4, 4, 2, 4},
		{ 6, 4, 3, 1, 4}
	};

	int len = 0, i = 0;

	for (; i < 4; i++) {
		len = sizeof(a[i])/sizeof(int);
		//		printf("%d\n",len);
		__parray(a[i], i + 1);
		gm_qsort(a[i], i + 1);
		__parray(a[i], i + 1);
	}

	return 0;
}

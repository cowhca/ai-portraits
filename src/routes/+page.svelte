<script>
	let fileInput;
	let files;
	let images = [];

	function getBase64FromFiles(files) {
		for (let i = 0; i < files.length; i++) {
			getBase64(files[i]);
		}
	}

	function getBase64(image) {
		const reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			images = [...images, e.target.result];
			uploadFunction(e.target.result);
		};
	}

	async function uploadFunction(imgBase64) {
		const data = {};
		const imgData = imgBase64.split(',');
		data['image'] = imgData[1];
		console.log(data);
		await fetch(`/upload`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify(data)
		});
	}
</script>

<div>
	{#each images as image}
		<img src={image} alt="upload" />
	{/each}
	<!-- {#if images}
		<img src={images} alt="img" />
	{:else}
		<img src="placeholder.png" alt="placeholder" />
	{/if} -->
	<input
		multiple
		class="hidden"
		id="file-to-upload"
		type="file"
		accept=".png,.jpg"
		bind:files
		bind:this={fileInput}
		on:change={() => getBase64FromFiles(files)}
	/>
	<button on:click={() => fileInput.click()}>Upload</button>
</div>

<?php

it('has transaction types page', function () {
    $response = $this->get('/transaction-types');

    $response->assertStatus(200);
});
